import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import LoadingIndicator from "./loadingindicator";

function Form({ route, type }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = type === "register" ? "Register" : "Login";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const response = await api.post(route, { username, password });

            if (response.status === 200 || response.status === 201) {
                const { access, refresh } = response.data;
                localStorage.setItem(ACCESS_TOKEN, access);
                localStorage.setItem(REFRESH_TOKEN, refresh);
                navigate("/");
            } else {
                navigate("/login");
            }
        } catch (error) {
            console.error("Error during authentication:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-sky-400 to-indigo-600 px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl space-y-6"
            >
                <h1 className="text-3xl font-bold text-center text-indigo-700">{name}</h1>

                <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />

                <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />

                {loading && <LoadingIndicator />}

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300 font-semibold"
                >
                    {name}
                </button>

                <p className="text-center text-gray-500 text-sm">
                    {type === "login" ? "Don't have an account?" : "Already registered?"}{" "}
                    <a
                        href={type === "login" ? "/register" : "/login"}
                        className="text-indigo-600 hover:underline"
                    >
                        {type === "login" ? "Register here" : "Login here"}
                    </a>
                </p>
            </form>
        </div>
    );
}

export default Form;
