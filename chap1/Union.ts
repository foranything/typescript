export class RangeValidationBase {
  private start = 0;

  private end = 0;

  protected RangeCheck(v: number): boolean {
    return v >= this.start && v <= this.end;
  }

  protected GetNumber(v: string): number {
    return new Number(v).valueOf();
  }
}

class UnionRangeValidation extends RangeValidationBase {
  IsInRange(v: string | number): boolean {
    return this.RangeCheck(typeof v === "number" ? v : this.GetNumber(v));
  }
}
