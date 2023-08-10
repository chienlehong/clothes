<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(){
        return view('auth.register');
    }
    public function registerPost(Request $request){
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password= Hash::make($request->password);
        if($user ->save()){
            return redirect('/login')->with('success','dang ky thanh cong');
        }
    }
    public function login(){
        return view('auth.login');
    }
    public function loginPost(Request $request){
        $email = $request->input('email');
        $password = $request->input('password');
        $data = [
            'email' => $email,
            'password'=>$password
        ];
        if(Auth::attempt($data)){
            if(auth()->user()->level === 1){
                return redirect('/admin-dashboard')->with('success','ban dang nhap thanh cong');
            }else{
                return redirect('/');
            }
        }
        return back()->with('erro','dang nhap that bai');
    }
    public function logout(){
        Auth::logout();
        return redirect()->route('login');
    }
}
