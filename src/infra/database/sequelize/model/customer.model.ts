import { Model, PrimaryKey, Column, Table } from "sequelize-typescript";

@Table({
    tableName: "products",
    timestamps: false,
})

export default class CustomerModel extends Model {
    @PrimaryKey
    @Column
    declare id: string;

    @Column
    declare name: string;

    @Column({allowNull: false})
    declare number: number;

    @Column({allowNull: false})
    declare street: string;

    @Column({allowNull: false})
    declare zipcode : string;

    @Column({allowNull: false})
    declare city : string;

    @Column({allowNull: false})
    declare active : boolean;

    @Column({allowNull: false})
    declare rewardPoints : number;

}