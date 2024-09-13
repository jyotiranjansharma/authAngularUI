import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrls } from '../api.urls';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    http = inject(HttpClient);
    isLoggedIn$ = new BehaviorSubject<boolean>(false);
    userName$ = new BehaviorSubject<string>('');

    notesSubject = new BehaviorSubject<any>([]);
    notes$ = this.notesSubject.asObservable();
    tokenSubject: BehaviorSubject<string | null>;
    tokenExpirationTimer: any;

    constructor() {
        const token = sessionStorage.getItem('jwtToken');
        this.tokenSubject = new BehaviorSubject<string | null>(token);
        this.scheduleTokenRenewal(token);
        this.getAllNotes()
    }

    getToken(): string | null {
        return this.tokenSubject.value;
    }

    scheduleTokenRenewal(token: string | null) {
        if (token) {
            const expirationDate = this.getTokenExpirationDate(token);
            const expiresIn = expirationDate ? expirationDate.valueOf() - new Date().valueOf() : 0;

            if (expiresIn > 0) {
                this.tokenExpirationTimer = setTimeout(() => {
                    this.refreshToken().subscribe();
                }, expiresIn - 60000); // Refresh the token 1 minute before expiry
            }
            console.log('schedule token renewal');
        }
    }

    getTokenExpirationDate(token: string): Date | null {
        const decoded: any = jwtDecode(token);
        
        if (decoded.exp === undefined) {
            return null;
        }

        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        console.log('date of expoiry', date);
        return date;
    }

    refreshToken(): Observable<any> {
        console.log('checking on refreshing token');
        return this.http.post<{ token: string }>('/api/refresh-token', {}).pipe(
            tap(response => {
                const newToken = response.token;
                sessionStorage.setItem('jwtToken', newToken);
                this.tokenSubject.next(newToken);
                this.scheduleTokenRenewal(newToken);
            })
        );
    }

    logout() {
        sessionStorage.removeItem('jwtToken');
        this.tokenSubject.next(null);
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
    }

    getAllNotes() {
        this.http.get<any>(`${apiUrls.notes}`).subscribe(notes => {
            this.notesSubject.next(notes)
        })
    }

    registerService(regObj: any) {
        return this.http.post<any>(`${apiUrls.authServiceApi}register`, regObj);
    }

    registerEmployeeService(empObj: any) {
        return this.http.post<any>(`${apiUrls.employee}`, empObj)
    }

    createANote(noteObj: any) {
        return this.http.post<any>(`${apiUrls.note}create`, noteObj);
    }

    deleteNote(notrId: any) {
        return this.http.delete<any>(`${apiUrls.note}deleteNote/${notrId}`)
    }

    getNoteById(noteId: any) {
        return this.http.get<any>(`${apiUrls.note}getNoteById/${noteId}`)
    }

    updateNote(noteObj: any) {
        console.log(noteObj, noteObj.note.id);
        return this.http.put<any>(`${apiUrls.note}updateNote/${noteObj.note.id}`, noteObj.note);
    }

    loginService(loginObj: any) {
        return this.http.post<any>(`${apiUrls.authServiceApi}login`, loginObj);
    }

    sendEmailService(email: string) {
        return this.http.post<any>(`${apiUrls.authServiceApi}send-mail`, { email: email })
    }

    resetPasswordService(resetObj: any) {
        return this.http.post<any>(`${apiUrls.authServiceApi}reset-password`, resetObj)
    }

    getAllUsers() {
        return this.http.get<any>(`${apiUrls.user}`)
    }

    getAllRoles() {
        return this.http.get<any>(`${apiUrls.roles}`)
    }

    getAllCars() {
        return this.http.get<any>(`${apiUrls.cars}`)
    }

    isloggedIn() {
        return !!localStorage.getItem('user_id');
    }

    userName() {
        return localStorage.getItem('username');
    }
}