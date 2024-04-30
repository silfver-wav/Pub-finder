import correctEncoding from "./correctEncoding"

const formatLocation = (location) => {
    location = correctEncoding(location)
    const parts = location.split(',')
    const streetAndNumber = parts[0].trim()

    return streetAndNumber
}

export default formatLocation;