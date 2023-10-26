import Role from "../models/role";

export const list = async (req, res) => {
    try {
        const role = await Role.getAllRole();
        res.json(role);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const show = async (req, res) => {
    try {
        const role = await Role.getRoleById(req.params.id);
        if (!role) {
            res.status(404).json({ error: "Role not found" });
        } else {
            res.json(role);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const create = async (req, res) => {
    try {
        const { name } = req.body;
        const roleId = await Role.createRole(name);
        res.json({ id: roleId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const update = async (req, res) => {
    try {
        const { name } = req.body;
        await Role.updateRole(req.params.id, name);
        res.json({ message: "Role updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const destroy = async (req, res) => {
    try {
        await Role.deleteRole(req.params.id);
        res.json({ message: "Role deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
