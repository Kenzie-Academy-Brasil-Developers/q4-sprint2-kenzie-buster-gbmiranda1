import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";

@Entity("stock")
export class Stock {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "int" })
  quantity: number;

  @Column({ type: "float" })
  price: number;
}
