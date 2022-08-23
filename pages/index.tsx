import { BrowserRendering } from "../components/functional/BrowserRedering";
import User from "../components/functional/User";

export default function DashBoard() {
    return (
        <div>
            <div>Dashboard</div>
            <BrowserRendering>
                <User/>
            </BrowserRendering>
        </div>
    )
}