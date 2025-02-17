import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    constructor() {
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteDatabseId);
        this.account = new Account(this.client);
        console.log(this.account);
    }
    async createAccount({ name, email, pass }) {
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                pass,
                name
            );
            if (userAccount) {
                return this.login({ email, pass });
            } else {
                return userAccount;
            }
        } catch (error) {
            console.log("Appwrite service :: login :: error", error);
        }
    }
    async login({ email, pass }) {
        return await this.account.createEmailPasswordSession(email, pass);
    }
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }
        return null;
    }
    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }
}

const authService = new AuthService();
export default authService;
