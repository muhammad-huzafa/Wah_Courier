import { useNavigate } from "react-router-dom"

export const setAuthToken = (token, hours) => {
    const now = new Date().getTime()
    const expiryTime = now + (hours * 60 * 60 * 1000)
    const authData = { token, expiryTime }
    localStorage.setItem("token", JSON.stringify(authData))
}

export const getAuthToken = () => {
    const authData = JSON.parse(localStorage.getItem("token")) 
    if (!authData) {
        return null
    }

    const now = new Date().getTime()
    if (now > authData.expiryTime) {
        localStorage.removeItem("token")
        const navigate = useNavigate()
        navigate("/login")
        return null
    }

    return authData.token
}


export const getPriceFormat = (p) => {
    return (
        (p).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })
    )
}

export const getDiscountedPrice = (cp, dis) => {
    let disVal = (cp * dis) / 100
    return (
        cp - disVal
    )
}  

export const dateFormatter = (ds) => {
    const date = new Date(ds)
    return date.toLocaleString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })
}

export const getTime = (ds) => {
    const date = new Date(ds)
    
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    })
}

export const getDate = (ds) => {
    const date = new Date(ds)

    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth()).padStart(2, "0")
    const year = date.getFullYear()
    
    return day + "-" + month + "-" + year
}



export const getCurrentYear = (cd) => {
    const date = new Date(cd)
    return date.getFullYear()
}

export const getCurrentDate = () => {
    const date = new Date()
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate())
    const year = date.getFullYear()

    return `${year}-${month}-${day}`
}

export const formatLocalPhoneNumber = (input) => {
    let value = input.replace(/\D/g, "");

    // Ensure the number starts with +92
    if (value.startsWith("92")) {
      value = "+92" + value.slice(2);
    } else if (!value.startsWith("+92")) {
      value = "+92";
    }

    // Apply formatting: +92-XXX-XXXXXXX
    if (value.length > 3) value = value.slice(0, 3) + "-" + value.slice(3);
    if (value.length > 7) value = value.slice(0, 7) + "-" + value.slice(7, 14);

    return value;
}

export const getDiscount = (v1, v2) => {
    let amount = Number(v1) || 0
    let dis = Number(v2) || 0
    let disFactor = (amount * dis) / 100
    return disFactor
}

export const getGst = (v1, v2) => {
    let grossTotal = Number(v1) || 0
    let gst = Number(v2) || 0
    let gstFactor = (grossTotal * gst) / 100
    let newTotal = (grossTotal + gstFactor).toFixed(2)
    return newTotal
}

export const getTotal = (v1, v2) => {
    return v1 - v2
}

export const getGrossTotal = (v1, v2, v3) => {
    let amount = Number(v1) || 0
    let dis = Number(v2)
    let gst = Number(v3) || 0

    let netAmount = amount - dis
    
    let gstFactor = (netAmount * gst) / 100        

    return netAmount + gstFactor
}

export const getInvoiceItemTotal = (v1, v2) => {
    const quantity = Number(v1) || 1
    const price = Number(v2) || 1
    return quantity * price
}

export const getLastStatus = (status) => {
    const lastStatus = status[ status.length - 1 ]
    return lastStatus.type
}

export const getLastStatusDescription = (status) => {
    const lastStatus = status[ status.length - 1 ]
    return lastStatus.description
}

export const getStatus = (status) => {
    return status.type
}

export const getStatusDescription = (status) => {
    if (status.type == 1) {
        return "Information Recieved"
    } else if (status.type >= 2 && status.type <= 5 ) {
        return status.description
    }
}


export const getTotalDimWeight = (dims) => {
    let dimWeight = 0

    dims.map((dim) => {
        let boxDimWeight = (dim.length * dim.length * dim.width) / 5000
        dimWeight += boxDimWeight
    })

    return dimWeight
}

export const getInvoiceGrandTotal = (invs) => {
    let grandTotal = 0

    invs.map((inv) => {
        let total = inv.price * inv.quantity
        grandTotal += total
    })

    return getPriceFormat(grandTotal)
}