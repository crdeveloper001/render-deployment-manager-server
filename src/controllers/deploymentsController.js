

const deploymentsController = {


    redeploySelectedService: async (req, res) => {
        try {
            const status = await services.GetCurrentStatusFromRender();
            console.log(status);
            res.status(200).json({
                status: "success",
                response: status
            });

        } catch (error) {
            res.status(500).json({
                status: "error",
                error: error
            })
        }
    }





}