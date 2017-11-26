export class Sugang {
  priority: number;
  isTemporary: boolean;
  sugangName: string;
  sugangNumber: string;
  constructor(p: number, t: boolean, sName: string, sNumber: string) {
    this.priority = p;
    this.isTemporary = t;
    this.sugangName = sName;
    this.sugangNumber = sNumber;
  }
}
