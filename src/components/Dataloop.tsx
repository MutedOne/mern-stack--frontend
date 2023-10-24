import { Suspense } from "react";

export default function Dataloop(props){
    console.log("asdasda")
    return <>
    {props.data.map((student,i) => (
      <tr key={i}>
        <th scope="row">{student.rn}</th>
        <td>{student.name}</td>
        <td>{student.description}</td>

        <td><a href={`${props.pageroute}/${student.id}`} className="btn btn-primary" >View</a></td>
       
      </tr>
    ))}

    </>
}
