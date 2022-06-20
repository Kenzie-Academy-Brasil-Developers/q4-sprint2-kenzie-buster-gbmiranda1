import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { Cart } from "./cart.entity";

@Entity()
export class User {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isAdm?: boolean;

  @OneToMany(() => Cart, (cart) => cart.user)
  cart: Cart[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
