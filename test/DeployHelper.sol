// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import "../../contracts/Core/TroveRedemptor.sol";
import "../../contracts/Core/SortedTroves.sol";
import "../../contracts/Core/TroveManager.sol";
import "../../contracts/Core/StabilityPoolManager.sol";
import "../../contracts/Core/AdminContract.sol";
import "../../contracts/Core/CollSurplusPool.sol";
import "../../contracts/Core/BorrowerOperations.sol";
import "../../contracts/Core/AGLParameters.sol";
import "../../contracts/Core/LockedAGL.sol";
import "../../contracts/Core/AGLStaking.sol";
import "../../contracts/Core/CommunityIssuance.sol";
import "../../contracts/Core/AGLToken.sol";
import "../../contracts/Core/TroveRedemptor.sol";
import "../../contracts/Pool/ActivePool.sol";
import "../../contracts/Pool/StabilityPoolAgilely.sol";
import "../../contracts/Pool/GasPool.sol";
import "../../contracts/Pool/DefaultPool.sol";
import "../../contracts/Interfaces/IPriceFeed.sol";
import "../../contracts/Dependencies/HintHelpers.sol";
import "../../contracts/Dependencies/PriceFeed.sol";
import "../../contracts/Token/USDAToken.sol";
import "../../contracts/InterestManager/EmergencyReserve.sol";
import "../../contracts/InterestManager/SavingModule.sol";
import "../../contracts/InterestManager/stabilityPool/SavingModuleStabilityPool.sol";
import "../../contracts/InterestManager/AgilelyInterestManager.sol";
import "../../contracts/InterestManager/AgilelyEIR.sol";
import "../../contracts/Test/MockPriceFeed.sol";

import "./config/Config.sol";

struct CoreContracts {
    MockPriceFeed priceFeed;
    USDAToken usdaToken;
    SortedTroves sortedTroves;
    TroveManager troveManager;
    ActivePool activePool;
    StabilityPoolManager stabilityPoolManager;
    StabilityPoolAgilely stabilityPoolAgilely;
    AdminContract adminContract;
    GasPool gasPool;
    DefaultPool defaultPool;
    CollSurplusPool collSurplusPool;
    BorrowerOperations borrowerOperations;
    HintHelpers hintHelpers;
    AGLParameters AGLParameters;
    LockedAGL lockedAGL;
}

struct AGLContracts{
    AGLStaking aglStaking;
    CommunityIssuance communityIssuance;
    AGLToken aglToken;
}

struct InterestContracts {
    EmergencyReserve emergencyReserve;
    SavingModuleStabilityPool savingModuleStabilityPool;
    SavingModule savingModule;
    AgilelyInterestManager agilelyInterestManager;
}


contract DeployHelper is Config{

    TroveRedemptor public redemptor;

    function setUp() public returns(CoreContracts memory, AGLContracts memory){
        CoreContracts memory coreContracts = deployCoreContracts();
        AGLContracts memory aglContracts =  deployAGLContracts(treasuryAddress);
        InitializeCoreContracts(coreContracts, aglContracts);
        InitializeAglContracts(coreContracts, aglContracts, treasuryAddress);
        redemptor = deployRedemptor(coreContracts, aglContracts);
        aglContracts.aglToken.approve(address (aglContracts.communityIssuance), type(uint256).max);
        coreContracts.adminContract.addNewCollateral(
            address (0),
            address (coreContracts.stabilityPoolAgilely),
            address (0),
            address (0),
            1 ether,
            1 ether,
            14
        );
        InterestContracts memory interestContratcs = deployInterestManager(coreContracts);
        setParams(coreContracts, aglContracts, interestContratcs);
        return (coreContracts, aglContracts);
    }


    function deployCoreContracts() public returns (CoreContracts memory coreContradcts){
        MockPriceFeed priceFeed = new MockPriceFeed();
        BorrowerOperations borrowerOperations = new BorrowerOperations();
        TroveManager troveManager = new TroveManager();
        address borrowerOperationsAddress = address(borrowerOperations);
        StabilityPoolManager stabilityPoolManager = new StabilityPoolManager();
        USDAToken usdaToken = new USDAToken(address(troveManager), address (stabilityPoolManager), borrowerOperationsAddress, borrowerOperationsAddress, 6, true);
        return CoreContracts({
        borrowerOperations : borrowerOperations,
        priceFeed : priceFeed,
        troveManager :  troveManager,
        lockedAGL : new LockedAGL(),
        sortedTroves : new SortedTroves(),
        stabilityPoolManager : stabilityPoolManager,
        stabilityPoolAgilely : new StabilityPoolAgilely(),
        adminContract : new AdminContract(),
        gasPool : new GasPool(),
        defaultPool :  new DefaultPool(),
        collSurplusPool : new CollSurplusPool(),
        hintHelpers : new HintHelpers(),
        AGLParameters : new AGLParameters(),
        usdaToken : usdaToken,
        activePool : new ActivePool()
    });
        //TODO other contracts
    }

    function deployAGLContracts(
        address treasurySigAddress
    ) public returns (AGLContracts memory aglContracts) {
        return
            AGLContracts({
                aglStaking: new AGLStaking(),
                communityIssuance: new CommunityIssuance(),
                aglToken: new AGLToken(treasurySigAddress)
            });
    }

    function InitializeCoreContracts(CoreContracts memory coreContracts, AGLContracts memory aglContracts) public {
        coreContracts.sortedTroves.setParams(address (coreContracts.troveManager), address (coreContracts.borrowerOperations));
        coreContracts.lockedAGL.setAddresses(address (aglContracts.aglToken));
        coreContracts.AGLParameters.setAddresses(address (coreContracts.activePool), address(coreContracts.defaultPool), address(coreContracts.priceFeed), address (coreContracts.adminContract));
        coreContracts.troveManager.setAddresses(
        address (coreContracts.borrowerOperations),
        address (coreContracts.stabilityPoolManager),
        address (coreContracts.gasPool),
        address (coreContracts.collSurplusPool),
        address (coreContracts.usdaToken),
        address (coreContracts.sortedTroves),
        address (aglContracts.aglStaking),
        address (coreContracts.AGLParameters)
    );

        coreContracts.borrowerOperations.setAddresses(
            address (coreContracts.troveManager),
            address (coreContracts.stabilityPoolManager),
            address (coreContracts.gasPool),
            address (coreContracts.collSurplusPool),
            address (coreContracts.sortedTroves),
            address (coreContracts.usdaToken),
            address (aglContracts.aglStaking),
            address (coreContracts.AGLParameters)
    );

        coreContracts.stabilityPoolManager.setAddresses(address (coreContracts.adminContract));

        coreContracts.activePool.setAddresses(
            address (coreContracts.borrowerOperations),
            address (coreContracts.troveManager),
            address (coreContracts.stabilityPoolManager),
            address (coreContracts.defaultPool),
            address (coreContracts.collSurplusPool)
    );

        coreContracts.defaultPool.setAddresses(address (coreContracts.troveManager), address (coreContracts.activePool));

        coreContracts.collSurplusPool.setAddresses(
        address (coreContracts.borrowerOperations),
        address (coreContracts.troveManager),
        address (coreContracts.activePool)
        );

        coreContracts.adminContract.setAddresses(
        address (coreContracts.AGLParameters),
        address (coreContracts.stabilityPoolManager),
        address (coreContracts.borrowerOperations),
        address (coreContracts.troveManager),
        address (coreContracts.usdaToken),
        address (coreContracts.sortedTroves),
        address (aglContracts.communityIssuance)
        );

        coreContracts.hintHelpers.setAddresses(
        address (coreContracts.sortedTroves),
        address (coreContracts.troveManager),
        address (coreContracts.AGLParameters)
        );
        //TODO set other contracts


    }



    function  InitializeAglContracts(CoreContracts memory coreContracts, AGLContracts memory aglContracts, address treasuryAddress) public {
        aglContracts.aglStaking.setAddresses(
            address (aglContracts.aglToken),
            address (coreContracts.usdaToken),
            address (coreContracts.troveManager),
            address (coreContracts.borrowerOperations),
            address (coreContracts.activePool),
            treasuryAddress
    );
        aglContracts.communityIssuance.setAddresses(
            address (aglContracts.aglToken),
            address (coreContracts.stabilityPoolManager),
            address (coreContracts.adminContract)
    );
    }

    function deployRedemptor(CoreContracts memory coreContracts, AGLContracts memory aglContracts) public returns (TroveRedemptor troveRedemptor){
        TroveRedemptor troveRedemptor = new TroveRedemptor();
        troveRedemptor.setUp(
            address (coreContracts.troveManager),
            address (coreContracts.sortedTroves),
            address (coreContracts.usdaToken),
            address (coreContracts.AGLParameters),
            address (coreContracts.collSurplusPool),
            address (coreContracts.gasPool),
            address (aglContracts.aglStaking),
            address (coreContracts.hintHelpers)
        );
        address troveRedemptorAddress = address (troveRedemptor);
        troveRedemptor.setAGLParameters(address (coreContracts.AGLParameters));
        coreContracts.sortedTroves.setRedemptorAddress(troveRedemptorAddress);
        coreContracts.usdaToken.setRedemptorAddress(troveRedemptorAddress);
        coreContracts.troveManager.setRedemptorAddress(troveRedemptorAddress);
        coreContracts.activePool.setRedemptorAddress(troveRedemptorAddress);
        coreContracts.collSurplusPool.setRedemptorAddress(troveRedemptorAddress);
        aglContracts.aglStaking.setRedemptorAddress(troveRedemptorAddress);
        return troveRedemptor;

    }

    function deployInterestManager(CoreContracts memory coreContracts) public returns(InterestContracts memory){
        EmergencyReserve emergencyReserve = new EmergencyReserve();
        emergencyReserve.setUp(address (coreContracts.usdaToken));
        emergencyReserve.transferOwnership(address (coreContracts.adminContract));

        SavingModuleStabilityPool savingModuleStabilityPool = new SavingModuleStabilityPool();
        SavingModule savingModule = new SavingModule();
        AgilelyInterestManager  agilelyInterestManager = new AgilelyInterestManager(
        );
        agilelyInterestManager.setUp(
            address (coreContracts.usdaToken),
            address (coreContracts.troveManager),
            address (coreContracts.priceFeed),
            address (coreContracts.borrowerOperations),
            address (savingModule)
        );

        savingModule.setUp(
        address (coreContracts.usdaToken),
        address (agilelyInterestManager),
        address (savingModuleStabilityPool),
        7000,
        700
        );
        savingModule.setEmergencyReserve(address (emergencyReserve));
        savingModuleStabilityPool.setUp(
        address (coreContracts.borrowerOperations),
        address (coreContracts.troveManager),
        address (coreContracts.usdaToken),
        address (coreContracts.sortedTroves),
        address (savingModule),
        address (coreContracts.AGLParameters)
        );
        savingModule.transferOwnership(address (coreContracts.adminContract));
        savingModuleStabilityPool.transferOwnership(address (coreContracts.adminContract));
        for(uint256 i = 0; i < interestModules.length; i++){
            InterestModule memory interestModule = interestModules[i];
            AgilelyEIR agilelyEIR = new AgilelyEIR();
            agilelyEIR.setUp(address (agilelyInterestManager), interestModule.name, interestModule.risk);
            agilelyInterestManager.setModuleFor(interestModule.linkedToken, address (agilelyEIR));
            agilelyEIR.transferOwnership(address (coreContracts.adminContract));
        }
        agilelyInterestManager.transferOwnership(address (coreContracts.adminContract));
        return InterestContracts({
         emergencyReserve : emergencyReserve,
         savingModuleStabilityPool : savingModuleStabilityPool,
         savingModule : savingModule,
         agilelyInterestManager : agilelyInterestManager
    });

    }
    //deploy dex trader

    function deployDexTrader() public {

    }


    function setParams(CoreContracts memory coreContracts, AGLContracts memory aglContracts, InterestContracts memory interestContracts) public {
        coreContracts.troveManager.setInterestManager(
            address (interestContracts.agilelyInterestManager)
    );
        coreContracts.borrowerOperations.setAGLccess(address (interestContracts.agilelyInterestManager), true);
        //TODO

        address stabilityPoolETH = address (coreContracts.stabilityPoolManager.getAssetStabilityPool(address (0)));
        aglContracts.communityIssuance.configStabilityPoolAndSend(
            stabilityPoolETH,
            address (aglContracts.aglToken),
            1 ether,
            10000 ether
        );
    }


}
