import { AuthAPI } from './AuthAPI';
import sinon, { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from 'sinon';
import { SigninStub } from '../stubs/signin.stub';
import { expect } from 'chai';
import { SignupStub } from '../stubs/signup.stub';

describe('AuthAPI', () => {
	class AuthAPIMock extends AuthAPI {}
	let xhr: SinonFakeXMLHttpRequestStatic;
	const requests: SinonFakeXMLHttpRequest[] = [];
	let authAPI: AuthAPIMock;

	beforeEach(() => {
		xhr = sinon.useFakeXMLHttpRequest();
		authAPI = new AuthAPIMock();
		// @ts-ignore
		global.XMLHttpRequest = xhr;

		xhr.onCreate = (request: SinonFakeXMLHttpRequest) => {
			requests.push(request);
		};
	});

	afterEach(() => {
		requests.length = 0;
	});

	it('should send signin request', () => {
		authAPI.signin(SigninStub);
		const [request] = requests;
		expect(request.url.includes('/signin')).to.eq(true);
	});

	it('should send signup  request', () => {
		authAPI.signup(SignupStub);
		const [request] = requests;
		expect(request.url.includes('/signup')).to.eq(true);
	});

	it('should send fetchUser method', () => {
		authAPI.fetchUser();
		const [request] = requests;
		expect(request.url.includes('/user')).to.eq(true);
	});

	it('should send logout  method', () => {
		authAPI.logout();
		const [request] = requests;
		expect(request.url.includes('/logout')).to.eq(true);
	});
});
