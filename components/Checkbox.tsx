import type React from "react";

const Checkbox:React.FC = ({ children }) => {
    return (
        <div>
            <input type="checkbox"/>
            <span>{children}</span>
        </div>
    )
}

export default Checkbox;