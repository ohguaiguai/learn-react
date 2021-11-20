/* let person = {
  name: 'zf',
  age: 11,
};
let { name, age } = person; */

/* let person = {
  name: 'zf',
  age: 11,
};
type Person = typeof person; */

/* 
interface IPerson {
    name:string,
    age:number
}

type MapPerson = {[key in keyof IPerson]:IPerson[key]}
 */

/* interface Company {
  num: number;
}
interface Person {
  name: string;
  age: string;
  company: Company;
}
// type Partial<T> = { [K in keyof T]?: T[K] }; 实现原理
type PartialPerson = Partial<Person>; */

/* type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}
type DeepPartialPerson = DeepPartial<Person>; */
/* 
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

type DeepPartialPerson = DeepPartial<Person>; */

interface Company {
  num: number;
}
interface Person {
  name: string;
  age: string;
  company: Company;
}
type PartialPerson = Partial<Person>;
type Required<T> = { [K in keyof T]-?: T[K] };
type RequiredPerson = Required<PartialPerson>;
