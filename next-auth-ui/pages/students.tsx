import { useEffect, useState } from 'react';

type Student = {
  id?: number;
  name: string;
  email: string;
};

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/students")
      .then(res => res.json())
      .then(setStudents);
  }, []);

  const addStudent = async () => {
    if (!name || !email) return;
    await fetch("http://localhost:8080/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email })
    });
    setName(""); setEmail("");
    const res = await fetch("http://localhost:8080/students");
    setStudents(await res.json());
  };

  return (
    <div style={{ padding: 20, maxWidth: 500, margin: "0 auto" }}>
      <h1>Students</h1>
      <div style={{ marginBottom: 16 }}>
        <input
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <button onClick={addStudent}>Add</button>
      </div>
      <ul>
        {students.map((s, i) => (
          <li key={s.id ?? i}>{s.name} - {s.email}</li>
        ))}
      </ul>
    </div>
  );
}
