export default function StatusMessage({ status }) {
  if (!status.message) return <span className="status" />;

  return (
    <span className={`status${status.error ? ' error' : ''}`}>
      {status.loading && <span className="spinner" />}
      {status.message}
    </span>
  );
}
