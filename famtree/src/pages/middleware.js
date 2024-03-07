import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

const secret = process.env.SECRET;

export default function middleware(req) {
  const { localStorage } = window;
  const jwt = localStorage.getItem('accessToken');
  const url = req.url;

  if (url.includes('/login')) {
    if (jwt) {
      try {
        verify(jwt, secret);
        return NextResponse.redirect('/');
      } catch (e) {
        return NextResponse.next();
      }
    }
  }

  if (url.includes('/tree')) {
    if (!jwt) {
      return NextResponse.redirect('/login');
    }
    try {
      verify(jwt, secret);
      return NextResponse.next();
    } catch (e) {
      return NextResponse.redirect('/login');
    }
  }

  return NextResponse.next();
}
