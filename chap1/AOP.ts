interface IDecorator {
  AnyoneCanRun(args: string): void;
  AdminOnly(args: string): void;
}

type Role = "user" | "admin";

class RoleCheck implements IDecorator {
  AnyoneCanRun(args: string) {
    console.log(args);
  }

  @Admin
  AdminOnly(args: string) {
    console.log(args);
  }
}

function IsInRole(role: Role): boolean {
  return currentUser.roles.some((r) => r.role === role);
}

/**
 * @date 2021-04-24
 * @param {any} target:any 데코레이터 적용할 요소
 * @param {string|symbol} propertyKey:string|symbol 요소의 이름
 * @param {PropertyDescriptor} descriptor:PropertyDescriptor 데코레이터를 적용한 메서드
 */
function Admin(
  target: any,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
) {
  let originalMethod = descriptor.value;
  descriptor.value = function () {
    if (IsInRole("admin")) {
      originalMethod.apply(this, arguments);
      return;
    }
    console.log(`${currentUser.user} is not in the admin role`);
  };
  return descriptor;
}

const currentUser = {
  user: "peter",
  roles: [{ role: "user" }],
};

function Test(decoratorMethod: IDecorator) {
  console.log(`Current user ${currentUser.user}`);
  decoratorMethod.AnyoneCanRun("Running as user");
  decoratorMethod.AdminOnly("Running as admin");
}

Test(new RoleCheck());
