import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployFitCoin: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("FitCoinToken", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });

  const deployment = await hre.deployments.get("FitCoinToken");
  console.log("✅ FitCoinToken deployed at:", deployment.address);
};

export default deployFitCoin;
deployFitCoin.tags = ["FitCoinToken"];