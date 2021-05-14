class ActiveRecord {
  Deleted = false;
}
class Person extends ActiveRecord {
  FirstName: string;

  LastName: string;

  constructor(firstName: string, lastName: string) {
    super();
    this.FirstName = firstName;
    this.LastName = lastName;
  }
}

type Constructor<T = {}> = new (...args: any[]) => T;

function RecordStatus<T extends Constructor>(base: T) {
  return class extends base {
    private deleted: boolean = false;
    get Deleted(): boolean {
      return this.deleted;
    }
    Delete(): void {
      this.deleted = true;
      console.log("The record has been marked as deleted.");
    }
  };
}

function Timestamp<T extends Constructor>(base: T) {
  return class extends base {
    Updated: Date = new Date();
  };
}

const ActivePerson = RecordStatus(Timestamp(Person));
