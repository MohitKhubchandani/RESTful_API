import Product from "../models/schema.js";

export const getAllProducts = async (req, res) => {
    try {
        const { company, name, price, sort, select, page, limit } = req.query;
        const queryObject = {};

        if (company) {
            queryObject.company = company;
        }

        if (name) {
            queryObject.name = { $regex: name, $options: "i" };
        }

        if (price) {
            queryObject.price = price;
        }
        
        let ApiData = Product.find(queryObject);

        if (sort) {
            const sortFix = sort.split(",").join(" ");
            ApiData = ApiData.sort(sortFix);
        }

        if (select) {
            let selectFix = select.split(",").join(" ");
            ApiData = ApiData.select(selectFix);
        }

        if (page) {
            let page = Number(req.query.page) || 1;
            let limit = 5;
            let skip = (page - 1) * limit;

            ApiData = ApiData.skip(skip).limit(limit);
        };

        if (limit) {
            let limit = Number(req.query.limit);
            ApiData = ApiData.limit(limit);
        }

        const Documents = await ApiData;
        res.status(200).json({ Documents, limit : Documents.length });

    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
};

