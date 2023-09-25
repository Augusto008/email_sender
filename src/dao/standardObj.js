import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class StandardDAO {

    async all(table) {
        try {
            let result = await prisma[table].findMany();
            if (result.length === 0) {
                return { success: false }
            };
            return { success: true, result };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async many(table, where) {
        try {
            let result = await prisma[table].findMany({
                where,
            });
            if (result.length === 0) {
                return { success: false }
            };
            return { success: true, result };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async unique(table, where) {
        try {
            let result = await prisma[table].findUnique({
                where,
            });
            if (!result) {
                return { success: false };
            };
            return { success: true, result };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async create(table, data) {
        try {
            let result = await prisma[table].create({
                data,
            });
            if (!result) {
                return { success: false };
            };
            return { success: true, result };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async update(table, where, data) {
        try {
            let result = await prisma[table].update({
                where,
                data,
            });
            if (!result) {
                return { success: false };
            };
            return { success: true, result };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async delete(table, where) {
        try {
            let result = await prisma[table].update({
                where,
                data: {
                    is_active: false,
                    is_deleted: true,
                },
            });
            if (!result) {
                return { success: false };
            };
            return { success: true, result };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async destroy(table, where) {
        try {
            let result = await prisma[table].delete({
                where,
            });
            if (!result) {
                return { success: false };
            };
            return { success: true, result };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

}