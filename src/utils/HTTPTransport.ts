import { queryString } from './helpers';
import { BACKEND_URLS } from '../enums/routes.enum';

export enum Method {
	Get = 'Get',
	Post = 'Post',
	Put = 'Put',
	Patch = 'Patch',
	Delete = 'Delete',
}

type Options = {
	method: Method;
	data?: any;
};

export default class HTTPTransport {
	static API_URL = BACKEND_URLS.URI;
	protected endpoint: string;

	constructor(endpoint: string) {
		this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
	}

	public get<Response>(path = '/', search: Record<string, unknown> = {}): Promise<Response> {
		let queriedUrl = path;
		if (search) {
			queriedUrl += queryString(search);
		}
		return this.request<Response>(this.endpoint + queriedUrl);
	}

	public post<Response = void>(path: string, data?: unknown): Promise<Response> {
		const result = this.request<Response>(this.endpoint + path, {
			method: Method.Post,
			data,
		});
		return result;
	}

	public put<Response = void>(path: string, data: unknown): Promise<Response> {
		return this.request<Response>(this.endpoint + path, {
			method: Method.Put,
			data,
		});
	}

	public patch<Response = void>(path: string, data: unknown): Promise<Response> {
		return this.request<Response>(this.endpoint + path, {
			method: Method.Patch,
			data,
		});
	}

	public delete<Response>(path: string, data?: unknown): Promise<Response> {
		return this.request<Response>(this.endpoint + path, {
			method: Method.Delete,
			data,
		});
	}

	private request<Response>(url: string, options: Options = { method: Method.Get }, timeout = 5000): Promise<Response> {
		const { method, data } = options;

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open(method, url);

			xhr.onreadystatechange = () => {
				if (xhr.readyState === XMLHttpRequest.DONE) {
					if (xhr.status < 400) {
						resolve(xhr.response);
					} else {
						reject(xhr.response);
					}
				}
			};

			xhr.onabort = () => reject({ reason: 'abort' });
			xhr.onerror = () => reject({ reason: 'network error' });
			xhr.ontimeout = () => reject({ reason: 'timeout' });

			xhr.withCredentials = true;
			xhr.responseType = 'json';
			xhr.timeout = timeout;

			if (method === Method.Get || !data) {
				xhr.send();
			} else {
				if (data instanceof FormData) {
					xhr.send(data);
				} else {
					xhr.setRequestHeader('Content-Type', 'application/json');
					xhr.send(JSON.stringify(data));
				}
			}
		});
	}
}
