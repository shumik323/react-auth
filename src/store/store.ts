import { IUser } from "../models/IUser";
import { observable, makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import { AuthResponse } from "../models/response/AuthResponse";
import { toast } from 'react-toastify';
import axios from "axios";

export default class store {
    @observable user: IUser = {} as IUser;
    @observable isAuth = false;
    @observable isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean): void {
        this.isAuth = bool;
    }

    setUser(user: IUser): void {
        this.user = user;
    }

    setLoading(bool: boolean): void {
        this.isLoading = bool;
    }

    async login(email: string, password: string, callback: () => void): Promise<void> {
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem("token", response.data.accessToken);

            this.setAuth(true);
            this.setUser(response.data.user);

            if (response.data.accessToken) {
                callback();

                toast.success('🦄 You are logged in!', {
                    autoClose: 1000,
                });
            }
        } catch (err) {
            console.error(err.response?.data?.message, 'login');
            toast.error(err.response?.data?.message, {
                autoClose: 1000,
            });
        }
    }

    async registration(email: string, password: string, callback: () => void): Promise<void> {
        try {
            const response = await AuthService.registration(email, password);
            localStorage.setItem("token", response.data.accessToken);

            this.setAuth(true);
            this.setUser(response.data.user);

            if (response.data.accessToken) {
                callback();

                toast.success('🦄 You are registered, now you can log in!', {
                    autoClose: 1000,
                })
            }
        } catch (err) {
            console.error(err.response?.data?.message, 'registration');
            toast.error(err.response?.data?.message, {
                autoClose: 1000,
            });
        }
    }

    async logout(): Promise<void> {
        try {
            await AuthService.logout();
            localStorage.removeItem("token");

            this.setAuth(false);
            this.setUser({} as IUser);

            toast.success('🦄 You are logged out!', {
                autoClose: 1000,
            })
        } catch (err) {
            console.error(err.response?.data?.message, 'logout');
        }
    }

    async checkAuth(): Promise<void> {
        this.setLoading(true);
        try {
            const response = await axios.get<AuthResponse>(`${process.env.REACT_APP_API_URL}/refresh`, {
                withCredentials: true,
            });

            localStorage.setItem("token", response.data.accessToken);

            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (err) {
            console.error(err.response?.data?.message, 'checkAuth');
        } finally {
            this.setLoading(false);
        }
    }
}
