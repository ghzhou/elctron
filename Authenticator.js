import axios from 'axios';

export class Authenticator {
	constructor(email, password) {
		this.email = email;
		this.password = password;
	}

	async authenticate() {
		await axios.post(
			'https://login.software.microfocus.com/msg/actions/doLogin.action', 
			`LWAP_REQ=&MULTI_DOMAIN_REQ=&hashlink=&urlToken=false&tzoutc=-480&res=1200*1920&bg=&username=${this.email}&password=${this.password}`);
	}
}
