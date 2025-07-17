export enum PumpType  {
    Centrifugal = "centrifugal",
    Submersible = "submersible",
    Diaphragm = "diaphragm",
    Rotary = "rotary",
    Peristaltic = "peristaltic"
}

export interface Pump {
    id: number
    name: string
    userId: number
    type: PumpType
    area: string
    latitude: string
    longitude: string
    flowRate: number
    offset: string
    currentPressure: number
    minPressure: number
    maxPressure: number
}
