import React, { useEffect, useState } from "react";
import { fetchData } from "./../resources/FetchData";

function ViewReport() {
    const [timeReports, setTimeReports] = useState([]); // Initialisera timeReports till en tom array istället för null

    useEffect(() => {
        // Hämta tidrapporter när komponenten renderas för första gången
        async function fetchTimeReports() {
            try {
                const response = await fetchData("timereports");
                setTimeReports(response);
            } catch (error) {
                console.error(error);
            }
        }

        fetchTimeReports();
    }, []);

    // Funktion för att extrahera och formatera tidrapportdata
    function extractData() {
        if (!timeReports || !Array.isArray(timeReports)) return []; // Kontrollera att timeReports är en array

        return timeReports.map(report => ({
            status: report.status,
            hours: report.hours,
            worked_hours: report.worked_hours,
            hours_left: report.hours_left
        }));
    }
    const extractedTimeReports = extractData(); // Extrahera tidrapportdata

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Hours</th>
                        <th>Worked Hours</th>
                        <th>Hours Left</th>
                    </tr>
                </thead>
                <tbody>
                    {extractedTimeReports.map((report, index) => (
                        <tr key={index}>
                            <td>{report.status}</td>
                            <td>{report.hours}</td>
                            <td>{report.worked_hours}</td>
                            <td>{report.hours_left}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ViewReport;