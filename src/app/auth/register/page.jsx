"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const router = useRouter();

	const onSubmit = handleSubmit(async (data) => {
		if (data.password !== data.confirmPassword) {
			return alert("La contraseñas no coinciden.");
		}
		console.log(data);
		const res = await fetch("/api/auth/register", {
			method: "POST",
			body: JSON.stringify({
				username: data.username,
				password: data.password,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (res.ok) {
			alert("Usuario registrado correctamente")
			//router.push("/auth/login");
		}else
		{
			alert("Hubo un error...")
		}
	});

	console.log(errors);

	return (
		<div className="h-[calc(100vh-7rem)] flex justify-center items-center">
			<form onSubmit={onSubmit} className="w-1/4">
				<h1 className="font-bold text-4xl mb-4">Nuevo usuario</h1>

				<label
					htmlFor="username"
					className="text-slate-400 mb-2 block text-sm"
				>
					Nombre de usuario:
				</label>
				<input
					type="text"
					{...register("username", {
						required: {
							value: true,
							message: "El nombre es requerido",
						},
					})}
					className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
					placeholder="yourUser123"
				/>

				{errors.username && (
					<span className="text-red-500 text-xs">
						{errors.username.message}
					</span>
				)}

				<label
					htmlFor="password"
					className="text-slate-400 mb-2 block text-sm"
				>
					Contraseña:
				</label>
				<input
					type="password"
					{...register("password", {
						required: {
							value: true,
							message: "Password is required",
						},
					})}
					className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
					placeholder="********"
				/>
				{errors.password && (
					<span className="text-red-500 text-sm">
						{errors.password.message}
					</span>
				)}

				<label
					htmlFor="confirmPassword"
					className="text-slate-400 mb-2 block text-sm"
				>
					Confirmar contraseña:
				</label>
				<input
					type="password"
					{...register("confirmPassword", {
						required: {
							value: true,
							message: "Confirm Password is required",
						},
					})}
					className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
					placeholder="********"
				/>
				{errors.confirmPassword && (
					<span className="text-red-500 text-sm">
						{errors.confirmPassword.message}
					</span>
				)}

				<button className="w-full bg-blue-500 text-white p-3 rounded-lg mt-2">
					Registrar
				</button>
			</form>
		</div>
	);
}
