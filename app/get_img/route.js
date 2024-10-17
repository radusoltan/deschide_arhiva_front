import {NextResponse} from "next/server";
import axios from "@/lib/axios";
export async function GET(request) {

  const response = await axios.get('http://localhost:8000/get_img?ImageWidth=1200&amp;ImageHeight=791&amp;ImageId=165560');

  console.log(response);


  return NextResponse.json({
    status: 200,
  })
}