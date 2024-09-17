import Cookies from 'js-cookie'
import { AuthUser } from '../models';

export class AuthService {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async login(email: string, password: string): Promise<any> {
        try {
            const response = await fetch(`${this.baseUrl}/v1/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error("Credenciais inválidas");
            }

            if (response.status === 401) return { error: "Credenciais inválidas" };
            if (response.status === 404) return { error: "Usuário não encontrado" };
            if (response.status === 400) return { error: "Erro na requisição" };

            if (!response.ok) return { error: "Ocorre um erro interno" };

            const data: AuthUser = await response.json();

            this.setSession(data);

            return data;
        } catch (error) {
            throw error;
        }
    }

    setSession(session: AuthUser) {
        const sessionJson = JSON.stringify(session);
        Cookies.set("auth_session", sessionJson, {
            sameSite: "strict",
            expires: 7,
            secure: process.env.NODE_ENV === "production",
        });

    }
    getSession() {
        if (!this.isAuthenticated()) return null;
        const session = Cookies.get("auth_session");
        return session ? (JSON.parse(session) as AuthUser) : null;
    }

    getToken() {
        const session = this.getSession();
        return session?.token;
    }

    isAuthenticated() {
        const token = Cookies.get("auth_session");
        if (!token) return false;
        return true;
    }
    
    logout() {
        Cookies.remove("auth_session");
    }
}