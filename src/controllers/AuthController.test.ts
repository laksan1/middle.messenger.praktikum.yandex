import { expect } from 'chai';
import AuthController from './AuthController';
import sinon from 'sinon';
import { LoginData } from '../interfaces/auth/login-data.interface';
import { SigninStub } from '../stubs/signin.stub';
import { AuthAPI } from '../api/AuthAPI';
import { SignupStub } from '../stubs/signup.stub';
import { RegistrationData } from '../interfaces/auth/registration-data.interface';

describe('AuthController', () => {
	it('should call signin', () => {
		const loginData: LoginData = SigninStub;
		const apiSigninStub = sinon.stub(AuthAPI.prototype, 'signin').resolves();
		AuthController.signin(loginData);
		expect(apiSigninStub.calledWith(loginData)).to.be.true;
		apiSigninStub.restore();
	});

	it('should call signup', () => {
		const registrationData: RegistrationData = SignupStub;
		const apiSigupStub = sinon.stub(AuthAPI.prototype, 'signup').resolves();
		AuthController.signup(registrationData);
		expect(apiSigupStub.calledWith(registrationData)).to.be.true;
		apiSigupStub.restore();
	});

	it('should call fetchUser', () => {
		const apiFetchUserStub = sinon.stub(AuthAPI.prototype, 'fetchUser').resolves();
		AuthController.fetchUser();
		expect(apiFetchUserStub.calledOnce).to.be.true;
		apiFetchUserStub.restore();
	});

	it('should call logout', () => {
		const apiLogoutStub = sinon.stub(AuthAPI.prototype, 'logout').resolves();
		AuthController.logout();
		expect(apiLogoutStub.calledOnce).to.be.true;
		apiLogoutStub.restore();
	});
});
