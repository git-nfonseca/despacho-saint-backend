import { NextResponse } from "next/server"

export async function middleware(request) {

  
    const jwt = request.headers.get("authorization")
   // console.log ('desde aqui 3: ' + JSON.stringify(request.nextUrl.pathname))
     //console.log(request.url + '    [heyyyyyyy 7777] ' + jwt)
     
    if (!jwt) {
     //   request.nextUrl.pathname = '/api/auth/error'  
       //console.log('no trae credenciales 859999') 
       return NextResponse.next()     
       //return NextResponse.redirect(request.nextUrl)
       //console.log ('´pathname: ' + request.nextUrl.pathname)
       //request.nextUrl.searchParams.set('from', request.nextUrl.pathname)
       //request.nextUrl.pathname = '/api/auth/error'
     
       //return NextResponse.redirect(request.nextUrl)



    }else {
      console.log('SIIIII trae credenciales111') 
    }

    try {
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL("/api/auth/error", request.url));
    }
  }
  
  export const config = {
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth/login
     * - api/auth/error
     * - favicon.ico (favicon file)
     */    
    matcher: ['/((?!api/auth/login|api/auth/error|favicon.ico).*)'],
    
  };
  