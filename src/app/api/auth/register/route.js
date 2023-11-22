import { NextResponse } from "next/server";

export function POST(req) {
	console.log(req.data);
	return NextResponse.json("registering");
}
export function GET() {
	return NextResponse.json("Hola mundo");
}
