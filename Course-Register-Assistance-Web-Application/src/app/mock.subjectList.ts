import {Subject} from './Subject';
// Subject 객체 배열
export const Subjects: Subject[] = [
  {major: '소프트웨어및컴퓨터공학전공(과)', subjectName: '컴퓨터프로그램설계', subjectNumber: 'F051', subjectType: '전공과목',
     credit: 3, time: 3, professorName: '황원준', subjectTime: '목B 목C'},
  {major: '소프트웨어및컴퓨터공학전공(과)', subjectName: '웹시스템설계', subjectNumber: 'F038', subjectType: '전공과목',
     credit: 4, time: 5, professorName: '오상윤', subjectTime: '화C 수3 수4 금C'},
  {major: '소프트웨어및컴퓨터공학전공(과)', subjectName: '컴퓨터통신', subjectNumber: 'F045', subjectType: '전공과목',
     credit: 3, time: 3, professorName: '조영종', subjectTime: '월E 수E'},
  {major: ' ', subjectName: '발표와 토의', subjectNumber: 'X237', subjectType: '교양과목',
     credit: 3, time: 3, professorName: '최용찬', subjectTime: '월D 목D'}
];


/*
*
* export class Subject {
  major: string;
  subjectName: string;
  subjectNumber: string;
  subjectType: string;
  isVerify: boolean;
  credit: number;
  time: number;
  professorName: string;
  subjectTime: number;
}
*/
