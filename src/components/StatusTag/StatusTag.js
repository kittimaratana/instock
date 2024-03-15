import "./StatusTag.scss"

export function StatusTag ({status}) {
  const statusClassName = status === "Out of Stock" ? "outofstock" : "instock"; 
  return(
    <p className={statusClassName}>{status.toUpperCase()}</p>
  )
}