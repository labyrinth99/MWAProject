import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IQuestion } from '../redux/question';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3000/';
const questionsUrl = baseUrl + 'questions/';


@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(private http: HttpClient) {}

  createQuestion(question: IQuestion):Observable<any> {
     return this.http.post(questionsUrl, question);
  }
  getQuestions():Observable<any>{
      return this.http.get(questionsUrl);
  }
  deleteQuestion(id:string):Observable<any>{
      return this.http.delete(questionsUrl+id);
  }
  getQuestionById(id:string):Observable<any>{
      return this.http.get(questionsUrl+id);
  }
  updateQuestion(question:IQuestion):Observable<any>{
      return this.http.put(questionsUrl+question._id,question);
  }
}
