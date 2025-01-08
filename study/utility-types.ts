type User = {
  id: string;
  name: string;
  age?: number;
};

type PartialUser = Partial<User>;
// type Partial<T> = { [P in keyof T]?: T[P] | undefined; }

type RequiredUser = Required<User>;
// type Required<T> = { [P in keyof T]-?: T[P]; }

type OmittedIdUser = Omit<User, "id">;
type OmittedIdAndAgeUser = Omit<User, "id" | "age">;
// type Omit<T, K extends keyof any> = { [P in Exclude<keyof T, K>]: T[P]; }

type PickedUser = Pick<User, "name" | "age">;
// type Pick<T, K extends keyof T> = { [P in K]: T[P] };

type ReadonlyUser = Readonly<User>;
// type Readonly<T> = { readonly [P in keyof T]: T[P]; }

type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};

type MutableUser = Mutable<User>;

type Role = "admin" | "user" | "anonymous";

type NonAdminRole = Exclude<Role, "admin">;
// type Exclude<T, U> = T extends U ? never : T

type RoleAttributes =
  | { role: "admin"; orgId: string }
  | { role: "user" }
  | { role: "anonymous" };

// ! ReturnValue

type Func = (a: number, b: string) => number;
type ReturnValue = ReturnType<Func>;

// ! Parameters

type Params = Parameters<Func>;

// ! NonNullable

type MaybeString = string | null | undefined;
type DefinitelyString = NonNullable<MaybeString>;

// ! Promise, Awaited

type PromiseString = Promise<number>;
type Result = Awaited<PromiseString>;

function test() {
  const func = async () => {
    return {
      id: 123,
    };
  };

  type Result = Awaited<ReturnType<typeof func>>;
}
