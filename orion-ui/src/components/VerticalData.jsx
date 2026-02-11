
export default function VerticalData(){
    return(
    <div className="bg-orion-void/40">
        <h2>Rotation</h2>
        <p>{Math.floor(Math.random() * 100)}</p>

        <h2>Velocity</h2>
        <p>{Math.floor(Math.random() * 100)}</p>

        <h2>Orbit</h2>
        <p>{Math.floor(Math.random() * 100)}</p>
    </div>
    )
    
}