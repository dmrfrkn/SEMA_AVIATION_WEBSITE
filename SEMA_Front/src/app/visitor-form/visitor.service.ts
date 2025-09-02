import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VisitorService {
  private apiUrl = 'http://localhost:5144/api/visitor';

  constructor(private http: HttpClient) {}

  addVisitor(visitor: any) {
    return this.http.post(this.apiUrl, visitor);
  }
}
