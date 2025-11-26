import App from "./App";

function TablePerson({ data , onDelete, onUpdate}) {
  function deleteButton(){
    console.log('render');
  }
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody>
        {data.map(person => (
          <tr key={person.id}>
            <td>{person.id}</td>
            <td>{person.name}</td>
            <td>{person.age} <button onClick={() => onDelete(person.id)}> Delete</button> <button onClick={() => onUpdate(person.id)} > Edit</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TablePerson;