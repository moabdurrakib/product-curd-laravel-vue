<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Nette\Utils\Image;


class ProductController extends Controller
{
    public function get_all_product(){
       $products = Product::all();
       return response()-> json([
           'product' =>$products
       ],200);
    }

    public function add_product(Request $request){
        $product = new Product();
        $product->name =$request->name;
        $product->description =$request->description;

        if ($request-> photo!= ""){
            $strpos = strpos ($request->photo,';');
            $sub = substr($request->photo,0,$strpos);
            $ex =explode('/',$sub)[1];
            $name = time().".".$ex;
            $img = Image::make($request->photo)-resize(200,200);
            $upload_path= public_path()."/upload/";
            $img=save($upload_path.$name);
            $product->photo =$name ;
        }else{
            $product->photo ="image.png";
        }
    }
}