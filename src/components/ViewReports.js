import { useEffect, useState } from "react";
import {fetchData} from "./../resources/FetchData";

function ViewReport(){
const [timeReports, setTimeReport] = useState(null)//TimeReport kommer att hålla den data vi hämtar från notion-databse 
const [selectData, setSelectData]= useState(null);//SelectDate kommer att användas för att hålla den filterade data som ska visas på användaregränssnittet

 async function fetchTimeReports(){
    try {
        const response = await fetchData("timereports")
        setTimeReport(response)
    } catch (error) {
        
    }
}
function printeTimeReport(){
    console.log(timeReports);
}
useEffect(() => {
   fetchTimeReports();
  }, []);
return (
    <div>
        <table>
            <thead>
                <tr>
                    <th>Active</th>
                    <th>Next Up</th>
                </tr>
            </thead>
            <body>
               <button onClick={printeTimeReport}>klick</button>
            </body>
        </table>
    </div>
);
};
export default ViewReport;