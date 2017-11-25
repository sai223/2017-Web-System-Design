export class Sugang {
  isTemporary: boolean;
  priority: Number;
  sugangName: string;
  sugangNumber: string;
  constructor(t: boolean, p: Number, sName: string, sNumber: string) {
    this.isTemporary = t;
    this.priority = p;
    this.sugangName = sName;
    this.sugangNumber = sNumber;
  }
}
