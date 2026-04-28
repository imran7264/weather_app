

export default function Button({onclick, className, children, loading }) {
    return (
        <button className={className} onClick={onclick} disabled={loading}>
         {children}
        </button>
    )
}