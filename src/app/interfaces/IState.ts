export interface IState
{
    stateName : string;
    stateCode: string;
    districtList : IDistrict[];

}

export interface IDistrict
{
    districtName : string;
    totalCases : number;
    active : number;
    recovered: number;
    deceased : number;
}