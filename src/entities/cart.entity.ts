import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Dvd } from "./dvd.entity";
import { User } from "./user.entity";

@Entity("cart")
export class Cart {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: false })
  paid: boolean;

  @Column({ type: "float" })
  total: number;

  @ManyToOne(() => User, (user) => user.cart, { eager: true })
  user: User;

  @ManyToOne(() => Dvd, (dvd) => dvd.cart, { eager: true })
  dvd: Dvd;
}
