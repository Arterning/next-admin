import { File, Product, Transaction, User } from "./models";
import { connectToDB } from "./utils";

export const fetchUsers = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 5;

  try {
    connectToDB();
    const count = await User.find({ username: { $regex: regex } }).count();
    const users = await User.find({ username: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    //find files by products ids
    const files = await File.find({ pid: { $in: users.map((product) => product._id) } });
  
    return { count, users, files };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users!");
  }
};

export const fetchUser = async (id) => {
  console.log(id);
  try {
    connectToDB();
    const user = await User.findById(id);
    //file find by pid
    const files = await File.find({ pid: id });
    return {
      user,
      files
    };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user!");
  }
};

export const fetchProducts = async (q, page) => {
  console.log(q);
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 5;

  try {
    connectToDB();
    const count = await Product.find({ title: { $regex: regex } }).count();
    const products = await Product.find({ title: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));

    //find files by products ids
    const files = await File.find({ pid: { $in: products.map((product) => product._id) } });
    return { count, products, files };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch products!");
  }
};


export const fetchTransaction = async (id) => {
  try {
    connectToDB();
    const transaction = await Transaction.findById(id);
    return transaction;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch transaction!");
  }
};

export const fetchTransactions = async(q, page) => {
  console.log(q);
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 5;

  try {
    connectToDB();
    const count = await Transaction.find({ name: { $regex: regex } }).count();
    const transactions = await Transaction.find({ name: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, transactions };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch transactions!");
  }
}

export const fetchFiles = async (q, page) => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = 5;
  try {
    connectToDB();
    const count = await File.find({ name: { $regex: regex } }).count();
    const files = await File.find({ name: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, files };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch Files!");
  }
}

export const fetchFile = async (id) => {
  try {
    connectToDB();
    const file = await File.findById(id);
    return file;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch file!");
  }
}


export const fetchProduct = async (id) => {
  try {
    connectToDB();
    const product = await Product.findById(id);
    //file find by pid
    const files = await File.find({ pid: id });
    return {
      product,
      files
    };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch product!");
  }
};

// DUMMY DATA

export const cards = [
  {
    id: 1,
    title: "Total Users",
    number: 10.928,
    change: 12,
  },
  {
    id: 2,
    title: "Stock",
    number: 8.236,
    change: -2,
  },
  {
    id: 3,
    title: "Revenue",
    number: 6.642,
    change: 18,
  },
];
