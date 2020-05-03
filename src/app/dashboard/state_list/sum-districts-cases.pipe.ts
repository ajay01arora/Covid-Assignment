import { Pipe, PipeTransform } from "@angular/core";
import { IState, IDistrict } from 'src/app/interfaces/IState';

@Pipe({
    name: "casesConverter"
})

export class CasesConverter implements PipeTransform
{
    transform(value : IState) : number
    {
        let retVal : number = 0;
        let dist : IDistrict;
        for(let i=0; i<value.districtList.length; i++)
        {
            retVal += value.districtList[i].totalCases;
        } 
        return retVal;

    }
}