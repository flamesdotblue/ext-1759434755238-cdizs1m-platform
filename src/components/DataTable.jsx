export default function DataTable({ teachers, students, classesEnriched }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Panel title={`Teachers (${teachers.length})`}>
        {teachers.length === 0 ? (
          <Empty>No teachers yet.</Empty>
        ) : (
          <ul className="divide-y divide-slate-800/80">
            {teachers.map((t) => (
              <li key={t.id} className="py-3">{t.name}</li>
            ))}
          </ul>
        )}
      </Panel>

      <Panel title={`Students (${students.length})`}>
        {students.length === 0 ? (
          <Empty>No students yet.</Empty>
        ) : (
          <ul className="divide-y divide-slate-800/80">
            {students.map((s) => (
              <li key={s.id} className="py-3">{s.name}</li>
            ))}
          </ul>
        )}
      </Panel>

      <Panel title={`Classes (${classesEnriched.length})`}>
        {classesEnriched.length === 0 ? (
          <Empty>No classes yet.</Empty>
        ) : (
          <ul className="space-y-3">
            {classesEnriched.map((c) => (
              <li key={c.id} className="rounded-lg border border-slate-800 bg-slate-900/40 p-3">
                <div className="font-medium text-slate-100">{c.name}</div>
                <div className="mt-2 text-sm text-slate-300">
                  <div>
                    Teachers: {c.teachers.length > 0 ? c.teachers.map((t) => t.name).join(', ') : '—'}
                  </div>
                  <div>
                    Students: {c.students.length > 0 ? c.students.map((s) => s.name).join(', ') : '—'}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}

function Panel({ title, children }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 shadow-lg shadow-black/20 h-full">
      <h3 className="text-sm font-semibold text-slate-200 tracking-wide mb-3">{title}</h3>
      {children}
    </div>
  );
}

function Empty({ children }) {
  return <div className="text-sm text-slate-400">{children}</div>;
}
